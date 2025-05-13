import React, { FC, useState } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import { API_URLS } from './config';
import { messages } from './messages';
import COOKE_IMAGE_1 from './assets/galleta-1.png';
import COOKE_IMAGE_2 from './assets/galleta-2.png';
import { Spinner } from 'vtex.styleguide';
import { useCssHandles } from 'vtex.css-handles';
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
  const { handles } = useCssHandles(CSS_HANDLES);

  const [ phrase, setPhrase ] = useState<string>('');
  const [ luckyNumber, setLuckyNumber ] = useState<string>('');
  const [ isCookieActive, setCookieActive ] = useState<boolean>(false);
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const intl = useIntl();

  const translateMessage = (message: MessageDescriptor) => intl.formatMessage(message);

  const getCookieList = async () => {
    setLoading(true);
    triggerCookie();

    try {
      const response = await fetch(API_URLS.cookieList);
      const data = await response.json();

      const randomCookie = data[Math.floor(Math.random() * data.length)]?.CookieFortune;
      const randomNumber = Math.floor(Math.random() * 100_000_000)?.toString()?.padStart(8, '0');
      const formattedNumber = randomNumber.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');

      setPhrase(randomCookie);
      setLuckyNumber(formattedNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const triggerCookie = () => {
    setCookieActive(true);

    setTimeout(() => {
      setCookieActive(false);
    }, 1500);
  }

  return (
    <section className="flex pa5 pb6">
        <div className="center w-90 w-80-m tc">

          <h2 className={handles.cookieTitle}>
            {translateMessage(messages.title)}
          </h2>

          <figure className={`center relative ${handles.cookieContainer}`} onClick={getCookieList}>
            <img 
              className={`db absolute top-0 left-0 ${handles.cookieImage} ${isCookieActive ? `${handles.animate} o-100` : 'o-0'}`} 
              src={COOKE_IMAGE_2} />
            <img 
              className={`db ${handles.cookieImage} ${isCookieActive ? `${handles.animate} o-0` : 'o-100'}`} 
              src={COOKE_IMAGE_1} />
          </figure>

          {isLoading && (
            <Spinner />
          )}

          {phrase && !isLoading && (
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
