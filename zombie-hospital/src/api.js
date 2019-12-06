import axios from "axios";

export async function getIllnesses() {
  let illnesses = await axios.get(
    "http://​dmmw-api.australiaeast.cloudapp.azure.com:8080/illnesses?limit=15"
  );

  return illnesses.data._embedded.illnesses.map(x => {
    return {
      label: x.illness.name,
      value: x.illness.id
    };
  });
}

export async function getHospitals() {
  let hospitals = await axios.get(
    "http://​dmmw-api.australiaeast.cloudapp.azure.com:8080/hospitals"
  );
  return hospitals.data;
}

export function addToWaitingList(payload) {
  return axios.post(
    "http://localhost:3000/users/waitinglist",
    payload
  );

}
