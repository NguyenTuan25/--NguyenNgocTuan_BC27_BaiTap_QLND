var baseURL = "https://62ba6d7a7bdbe01d5288e566.mockapi.io/api/users";
function apiGetUsers() {
  return axios({
    url: baseURL,
    method: "GET",
  });
}
