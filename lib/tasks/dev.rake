namespace :dev do
    namespace :db do
        desc 'Reset DB'
        task reset: :environment do
            puts("Reset database for #{Rails.env}")
            Rake::Task['db:drop'].invoke
            Rake::Task['db:create'].invoke
            Rake::Task['db:migrate'].invoke

            sh 'rubocop --autocorrect --only Style/StringLiterals'
            sh 'rubocop --autocorrect --only Style/WordArray'
            sh 'rubocop --autocorrect --only Layout/TrailingWhitespace'

            Rake::Task['db:seed'].invoke

            sh 'bundle exec rubocop --parallel'

        end
    end
end
