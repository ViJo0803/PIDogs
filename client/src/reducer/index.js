const initialState = {
  dogs: [],
  alldogs: [],
  breeds: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        alldogs: action.payload,
      };
    case "FILTER_CREATED":
      const allDogs = state.alldogs;

      const createdfilter =
        action.payload === "creados"
          ? allDogs.filter((el) => el.createdInDb)
          : allDogs.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "todos" ? state.alldogs : createdfilter,
      };
    case "FILTER_TEMPERAMENT":
      const Dogs = state.alldogs;
      const temperament =
        action.payload === "Todos"
          ? Dogs
          : Dogs.filter(
              (el) =>
                el.temperament &&
                el.temperament.split(", ").find((e) => e === action.payload)
            );
      console.log("filtro temperamentos", Dogs);
      return {
        ...state,
        dogs: temperament,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
              }
              if (b.name.toUpperCase() > a.name.toUpperCase()) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return -1;
              }
              if (b.name.toUpperCase() > a.name.toUpperCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
    case "POST_DOGS":
      return {
        ...state,
      };
    case "GET_BREEDS":
      return {
        ...state,
        breeds: action.payload,
      };
    case "GET_NAME_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
    case "ORDER_BY_PESO":
      let sortedArrPeso =
        action.payload === "pesoasc"
          ? state.dogs.sort(function (a, b) {
              b = b.peso.trim().split(" - ")[0];
              a = a.peso.trim().split(" - ")[0];
              if (!Number(b)) b = 100;

              if (!Number(a)) a = 100;
              return a - b;
            })
          : state.dogs.sort(function (a, b) {
              b = b.peso.trim().split(" - ")[0];
              a = a.peso.trim().split(" - ")[0];
              if (!Number(b)) b = 0;

              if (!Number(a)) a = 0;

              return b - a;
            });
      return {
        ...state,
        dogs: sortedArrPeso,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
