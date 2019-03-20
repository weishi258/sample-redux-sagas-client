import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import configureStore from './configure-store';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as Cookies from 'es-cookie';
import { Cookie } from './constants/cookie';
import { accountInitialState } from './stores/account/reducers';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { getLanguageSetting } from './utils/language-helpers';

// get history
const history = createBrowserHistory();

// lets check if we have language cookie stored, if not using browser default
let language = Cookies.get(Cookie.Language);
if (language === undefined) {
    language =
        (navigator.languages && navigator.languages[0]) || navigator.language;
}
const languageSetting = getLanguageSetting(language);
// lets check if user logged in
let sessionState = accountInitialState;
const sessionCookie = Cookies.get(Cookie.Session);
if (sessionCookie !== undefined) {
    const sessionObject = Cookies.parse(sessionCookie);
    // make sure both field is not empty
    if (
        sessionObject.name !== undefined &&
        sessionObject.name !== '' &&
        sessionObject.session !== undefined &&
        sessionObject.session !== ''
    ) {
        sessionState = {
            name: sessionObject.name,
            session: sessionObject.session,
        };
    }
}
const store = configureStore(history, {
    account: sessionState,
    language: { language: language },
    router: {
        location: { pathname: '/', search: '', hash: '', state: null },
        action: 'REPLACE',
    },
});


ReactDOM.render(
    <Provider store={store}>
        <IntlProvider
            locale={languageSetting.languageWithoutRegionCode}
            messages={languageSetting.messages}
        >
            <LocaleProvider locale={languageSetting.locale}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LocaleProvider>
        </IntlProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);