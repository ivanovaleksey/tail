require 'singleton'
module Tail
  class Log
    include Singleton
    attr_reader :files
    attr_reader :n
    N_VALUE = 100

    def initialize
      begin
        @n = N_VALUE
        @files = Dir.entries(Rails.root.join('log').to_s).select { |file| file.include? '.log' }
      rescue
        return []
      end
    end

    def flush(file_name)
      log_name = "#{Rails.env}.log"
      f = File.open Rails.root.join('log', log_name), 'w'
      f.close
      Rails.logger.warn "#{log_name} flushed"
    rescue => e
      Rails.logger.error(e.message)
      Rails.logger.error(e.backtrace[0..3].join("\n"))
    end

    def n=(value)
      if value.present? && value.to_i > 0
        @n =value.to_i
      else
        @n = N_VALUE
      end
    end

    # @return [log entries array]
    # @param [File name] file_name
    # @param [strings to return] n
    def tail(file_name)
      begin
        @files.include?(file_name) ? `tail -n #{@n} log/#{file_name}`.lines : []
      rescue
        return []
      end
    end
  end
end
