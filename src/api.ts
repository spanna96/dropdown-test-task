const languagesAPI =
  "https://api.cognitive.microsofttranslator.com/Languages?api-version=3.0";

export const fetchLanguages = async () => {
  const data = await fetch(languagesAPI, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Accept-Language": "ru",
    },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));

  return data;
};
