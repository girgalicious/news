require 'rails_helper'

RSpec.describe HomeController, :type => :controller do
    let(:valid_session) { { 'HB-APIKey' => api_key.key, 'HB-UserToken' => jwt }                                    }

    describe '#health_check' do
        it 'renders error' do
            get :health_check, params: nil
            expect(response).to have_http_status(:ok)
        end
    end
end
