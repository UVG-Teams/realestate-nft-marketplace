module Debugger
    ANSI_RED = "\e[31m"
    ANSI_WHITE = "\e[37m"
    ANSI_RESET = "\e[0m"

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
