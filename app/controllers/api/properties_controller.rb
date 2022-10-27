class Api::PropertiesController < ApplicationApiController
    before_action :set_property, only: %i[ show edit update destroy ]

    # GET /properties or /properties.json
    def index
        @properties = Property.all
        respond_with_status(200, @properties)
    end

    # GET /properties/1 or /properties/1.json
    def show
        respond_with_status(200, @property)
    end

    # POST /properties or /properties.json
    def create
        begin
            @property = Property.new(property_params)
        rescue => exception
            return respond_with_status(400, exception.to_s)
        end

        @property.user = @current_user

        if @property.save
            respond_with_status(200, "Property was successfully created.")
        else
            respond_with_status(400, @property.errors)
        end
    end

    # PATCH/PUT /properties/1 or /properties/1.json
    def update
        return respond_with_status(401) if @property.user != @current_user

        if @property.update(property_params)
            respond_with_status(200, "Property was successfully updated.")
        else
            respond_with_status(400, @property.errors)
        end
    end

    # DELETE /properties/1 or /properties/1.json
    def destroy
        return respond_with_status(401) if @property.user != @current_user

        @property.destroy

        respond_with_status(200, "Property was successfully destroyed.")
    end

    # ====================================================================================================
    # Custom methods
    # ====================================================================================================

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_property
        @property = Property.find_by_id(params[:id])
        return respond_with_status(404, "Property not found.") if @property.blank?
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
            :bathrooms,
        )
    end
end
