import React, { FC, useState, useEffect } from 'react';
import { useLazyQuery } from 'react-apollo';
import { MessageDescriptor, useIntl } from 'react-intl';
import GET_ALL_FORTUNE_COOKIES from './graphql/getCookies.graphql';
import { masterdataConfig } from './config';
import { messages } from './messages';
import COOKE_IMAGE_1 from './assets/galleta-1.png';
import COOKE_IMAGE_2 from './assets/galleta-2.png';
import { Spinner } from 'vtex.styleguide';
import { useCssHandles } from 'vtex.css-handles';
import { parseFortunes } from './utils';
import './styles.css';

const CSS_HANDLES = [
  'cookieContainer', 
  'cookieImage', 
  'animate', 
  'cookieTitle',
  'cookiePhrase',
  'luckyTitle',
  'luckyNumber',
  'textAnimation'
] as const;

export const Fortune: FC = () => {
  const { acronym, fields, pageSize } = masterdataConfig;

  const { handles } = useCssHandles(CSS_HANDLES);
  const [ phrase, setPhrase ] = useState<string>('');
  const [ luckyNumber, setLuckyNumber ] = useState<string>('');
  const [ isCookieActive, setCookieActive ] = useState<boolean>(false);
  const intl = useIntl();

  const [ getDocument, { data }] = useLazyQuery(GET_ALL_FORTUNE_COOKIES);

  const translateMessage = (message: MessageDescriptor) => intl.formatMessage(message);

  const handleClick = () => {
    triggerCookie();
    getDocument({variables: { acronym, fields, pageSize }});
  }

  useEffect(() => {
    getCookieList();
  }, [data, isCookieActive]);

  const getCookieList = () => {
    if(data && !isCookieActive){
      const cookieList = parseFortunes(data);
      const randomCookie = cookieList?.[Math.floor(Math.random() * cookieList?.length)]?.phrase;
      const randomNumber = Math.floor(Math.random() * 100_000_000)?.toString()?.padStart(8, '0');
      const formattedNumber = randomNumber.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');

      setPhrase(randomCookie);
      setLuckyNumber(formattedNumber);
    }
  }

  const triggerCookie = () => {
    setCookieActive(true);

    setTimeout(() => {
      setCookieActive(false);
    }, 1000);
  }

  return (
    <section className="flex pa5 pb6">
        <div className="center w-90 w-80-m tc">

          <h2 className={handles.cookieTitle}>
            {translateMessage(messages.title)}
          </h2>

          <figure className={`center relative ${handles.cookieContainer}`} onClick={() => handleClick()}>
            <img 
              className={`db absolute top-0 left-0 ${handles.cookieImage} ${isCookieActive ? `${handles.animate} o-100` : 'o-0'}`} 
              src={COOKE_IMAGE_2} />
            <img 
              className={`db ${handles.cookieImage} ${isCookieActive ? `${handles.animate} o-0` : 'o-100'}`} 
              src={COOKE_IMAGE_1} />
          </figure>

          {isCookieActive && (
            <Spinner />
          )}

          {phrase && !isCookieActive && (
            <div className={`${handles.textAnimation}`}>
              <h3 className={handles.cookiePhrase}>
                "{phrase}"
              </h3>
              <h4 className={handles.luckyTitle}>
                {translateMessage(messages.lucky)}
              </h4>
              <h5 className={handles.luckyNumber}>
                {luckyNumber}
              </h5>
            </div>
          )}
        </div>
    </section>
  )
}

export default Fortune;
