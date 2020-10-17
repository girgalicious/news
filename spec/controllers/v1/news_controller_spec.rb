require 'rails_helper'

RSpec.describe V1::NewsController, :type => :controller do
    let(:valid_session) { { 'HB-APIKey' => "" }  }

    before :each do
        request.headers.merge!(valid_session) # Add to request headers
    end

    describe 'GET #index' do
        context 'gets the items' do
            before do
                get :index, params: {}
            end

            it 'responds with success' do
                expect(response).to have_http_status(:success)
            end
        end
    end
end
