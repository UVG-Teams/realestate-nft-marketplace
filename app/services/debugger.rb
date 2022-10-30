module Debugger
    ANSI_RED = "\e[31m".freeze
    ANSI_WHITE = "\e[37m".freeze
    ANSI_RESET = "\e[0m".freeze

    def self.debug(*args)
        puts ANSI_RED
        puts '-' * 100
        args.each do |arg|
            puts arg
        end
        puts '-' * 100
        puts ANSI_RESET
    end
end
