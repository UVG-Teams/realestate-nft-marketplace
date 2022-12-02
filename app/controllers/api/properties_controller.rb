class Api::PropertiesController < ApplicationApiController
    before_action :set_property, only: %i[show edit update destroy get_files upload_files]
    before_action :check_ownership, only: %i[update destroy get_files upload_files]

    # GET /properties or /properties.json
    # @return [Object] All properties information
    def index
        @properties = Property.all
        respond_with_status(200, @properties)
    end

    # GET /properties/1 or /properties/1.json
    # @param [int] id The property id to show
    # @return [Object] Single property information
    def show
        respond_with_status(200, @property)
    end

    # POST /properties or /properties.json
    # @param [String] finca
    # @param [String] folio
    # @param [String] libro
    # @param [String] location Property location
    # @param [String] category Property category
    # @param [int] rooms Number of rooms in the property
    # @param [int] bathrooms Number of bathrooms in the property
    # @return [Object] The new created property information
    def create
        begin
            @property = Property.new(property_params)
        rescue StandardError => e
            return respond_with_status(400, e.to_s)
        end

        @property.user = @current_user

        if @property.save
            respond_with_status(200, 'Property was successfully created.')
        else
            respond_with_status(400, @property.errors)
        end
    end

    # PATCH/PUT /properties/1 or /properties/1.json
    # @param [int] id The property id to update
    # @param [String] finca
    # @param [String] folio
    # @param [String] libro
    # @param [String] location Property location
    # @param [String] category Property category
    # @param [int] rooms Number of rooms in the property
    # @param [int] bathrooms Number of bathrooms in the property
    # @return [Object] The updated property information
    def update
        if @property.update(property_params)
            respond_with_status(200, 'Property was successfully updated.')
        else
            respond_with_status(400, @property.errors)
        end
    end

    # DELETE /properties/1 or /properties/1.json
    # @param [int] id The property id to delete
    # @return [nil, error] If the property was delted returns nil
    def destroy
        @property.destroy

        respond_with_status(200, 'Property was successfully destroyed.')
    end

    # ====================================================================================================
    # Custom methods
    # ====================================================================================================

    # @param [int] id The property id to get the files from
    # @return The files from a property
    def retrieve_files
        response = {
            images: []
        }

        @property.files.each do |file|
            response[:images].append({
                id: file.id,
                url: url_for(file)
            })
        end

        respond_with_status(200, response)
    end

    # @param [int] id The property id to upload the file to
    # @param File The file to upload
    # @return [true, error] True on upload successfull
    def upload_files
        # Attach the new file
        @property.files.attach(params[:files])

        response = {
            images: []
        }

        @property.files.each do |file|
            response[:images].append({
                id: file.id,
                url: url_for(file)
            })
        end

        respond_with_status(200, response)
    end

    # POST /properties/sync or /properties/sync.json
    def sync
        begin
            return respond_with_status(400) if sync_property_params.blank?

            @property = Property.find_by(nft_id: sync_property_params[:nft_id])

            if @property.blank?
                @property = Property.new

                # Looking for the user owner of the given account
                wallet = User::Wallet.create_with(
                    user: User.new({
                        email: sync_property_params[:account]
                    })
                ).find_or_create_by(account: sync_property_params[:account])

                @property.user = wallet.user if wallet
                @property.nft_id = sync_property_params[:nft_id]
            end

            @property.finca = sync_property_params[:finca] unless sync_property_params[:finca].blank?
            @property.folio = sync_property_params[:folio] unless sync_property_params[:folio].blank?
            @property.libro = sync_property_params[:libro] unless sync_property_params[:libro].blank?
            @property.location = sync_property_params[:location] unless sync_property_params[:location].blank?
            @property.rooms = sync_property_params[:rooms] unless sync_property_params[:rooms].blank?
            @property.bathrooms = sync_property_params[:bathrooms] unless sync_property_params[:bathrooms].blank?
            @property.latitude = sync_property_params[:latitude] unless sync_property_params[:latitude].blank?
            @property.longitude = sync_property_params[:longitude] unless sync_property_params[:longitude].blank?
            @property.price = sync_property_params[:price] unless sync_property_params[:price].blank?

            # @property.category = sync_property_params[:category]
            # @property.status = sync_property_params[:status]
        rescue StandardError => e
            return respond_with_status(400, e.to_s)
        end

        if @property.save
            respond_with_status(200, 'Property was successfully created.')
        else
            respond_with_status(400, @property.errors)
        end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_property
        @property = Property.find_by_id(params[:id])
        return respond_with_status(404, 'Property not found.') if @property.blank?
    end

    # Only allow a list of trusted parameters through.
    def property_params
        params.fetch(:property, {}).permit(
            :finca,
            :folio,
            :libro,
            :location,
            :category,
            :rooms,
            :bathrooms
        )
    end

    # Only allow a list of trusted parameters through.
    def sync_property_params
        params.fetch(:property, {}).permit(
            :nft_id,
            :account,
            :finca,
            :folio,
            :libro,
            :location,
            :status,
            :category,
            :rooms,
            :bathrooms,
            :latitude,
            :longitude,
            :price
        )
    end

    def check_ownership
        return respond_with_status(401) if @current_user != @property.user
    end
end
