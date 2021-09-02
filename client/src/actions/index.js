import axios from "axios";

export function getDog() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function filterDogsByStatus(payload) {
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
