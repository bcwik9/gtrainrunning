class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def index
  end

  def mta_data
    mta_response = `curl 'http://www.mta.info/status/subway/#{params[:subway]}'`
    render text: mta_response
  end
end
