export const BASE_URL = "http://172.30.1.53:5000";
export const STORAGE_KEY = "@toDos";

export const fetchRegister = async (
  country,
  email,
  password,
  confirmPass,
  name,
  lastName,
  firstName,
  birthNumber,
  recommendCode
) => {
  const data = await (
    await fetch(`${BASE_URL}/api/users/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country,
        email,
        password,
        confirmation_password: confirmPass,
        name,
        lastName,
        firstName,
        birthNumber,
        recommendCode,
      }),
    })
  ).json();
  return data;
};

export const fetchLogin = async (email, password) => {
  const data = await (
    await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  ).json();

  return data;
};

export const fetchEmailCheck = async (email, codeNum) => {
  const data = await (
    await fetch(`${BASE_URL}/api/users/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, codeNum }),
    })
  ).json();

  return data;
};
