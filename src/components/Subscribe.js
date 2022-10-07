import React, { useState, useEffect } from 'react';
import logo from '../images/cohlogo.png';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import InputField from './InputField';

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  useEffect(() => {
    if (status === 'success') clearFields();
  }, []);

  const clearFields = () => {
    setEmail('');
  };

  return (
    <form className="mc__form" onSubmit={(e) => handleSubmit(e)}>
      <h1>Join our email list</h1>

      {status === 'error' && (
        <div
          className="mc__alert mc__alert--error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      {status !== 'success' ? (
        <div className="mc__field-container">
          <InputField
            label="Email"
            onChangeHandler={setEmail}
            type="email"
            value={email}
            placeholder="your@email.com"
            isRequired
          />
        </div>
      ) : null}

      {/*Close button appears if form was successfully sent*/}
      {status === 'success' ? (
        'hello'
      ) : (
        <InputField label="subscribe" type="submit" formValues={[email]} />
      )}
    </form>
  );
};

function Subscribe() {
  const postUrl = `https://chambersofhell.us13.list-manage.com/subscribe/post?u=ce97bbc4d197d2134a4f80100&id=6a740958c6`;

  return (
    <>
      <header>
        <div class="logo">
          <img src={logo} width="150" alt="Chambers of Hell logo" />
        </div>
      </header>
      <main>
        <MailchimpSubscribe
          url={postUrl}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          )}
        />
      </main>
    </>
  );
}

export default Subscribe;
