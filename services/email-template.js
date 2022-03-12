exports.signup = (name) => {
  return {
    subject: "Thanks for Registering with BrijFood.com:)",
    body: `
    <h1>${name}</h1>
    `,
  };
};
