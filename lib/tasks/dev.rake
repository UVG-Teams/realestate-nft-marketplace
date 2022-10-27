namespace :dev do
    namespace :db do

        desc "Reset DB"
        task :reset => :environment do
            env = "development"
            puts("Reset database for #{env}")
            Rake::Task["db:drop"].invoke
            Rake::Task["db:create"].invoke
            Rake::Task["db:migrate"].invoke
            Rake::Task["db:seed"].invoke
        end

    end

end