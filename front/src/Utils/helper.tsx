export const getGoogleUrl = (from: string) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options: any = {
    redirect_uri: `${process.env.REACT_APP_GOOGLE_REDIRECTION_URL}`,
    client_id: `${process.env.REACT_APP_GOOGLE_CLIENTID}`,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      `${process.env.REACT_APP_GOOGLE_LOGIN_SCOPE_PROFILE}`,
      `${process.env.REACT_APP_GOOGLE_LOGIN_SCOPE_EMAIL}`,
    ].join(' '),
    state: from
  };
  console.log("options", options)

  const qs = new URLSearchParams(options);
  console.log("qs", qs)

  return `${rootUrl}?${qs.toString()}`;
};