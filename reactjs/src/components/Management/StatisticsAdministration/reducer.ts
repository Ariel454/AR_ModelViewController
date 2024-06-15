import { useEffect, useReducer } from "react";
import { User, Invoice, Claim, Award } from "../../../types";

type GetUsers = {
  type: "get-users";
  payload: {
    users: User[];
  };
};

type GetInvoices = {
  type: "get-invoices";
  payload: {
    invoices: Invoice[];
  };
};

type GetClaims = {
  type: "get-claims";
  payload: {
    claims: Claim[];
  };
};

type GetAwards = {
  type: "get-awards";
  payload: {
    awards: Award[];
  };
};

type ActionTypes = GetUsers | GetClaims | GetInvoices | GetAwards;

type State = {
  users: User[];
  invoices: Invoice[];
  claims: Claim[];
  awards: Award[];
};

const initialState: State = {
  users: [],
  invoices: [],
  claims: [],
  awards: [],
};

const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "get-users": {
      const { users } = action.payload;
      return {
        ...state,
        users,
      };
    }
    case "get-invoices": {
      const { invoices } = action.payload;
      return {
        ...state,
        invoices,
      };
    }
    case "get-claims": {
      const { claims } = action.payload;
      return {
        ...state,
        claims,
      };
    }
    case "get-awards": {
      const { awards } = action.payload;
      return {
        ...state,
        awards,
      };
    }
    default:
      return state;
  }
};

export interface ReducerValue extends State {
  getUsers: () => void;
  getInvoices: () => void;
  getClaims: () => void;
  getAwards: () => void;
}

export const useAdministrationReducer = (): ReducerValue => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUsers = async () => {
    try {
      const response = await fetch("https://ar-mvc-api.vercel.app/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      dispatch({ type: "get-users", payload: { users } });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getInvoices = async () => {
    try {
      const response = await fetch(
        "https://ar-mvc-api.vercel.app/api/invoices"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const invoices = await response.json();
      dispatch({ type: "get-invoices", payload: { invoices } });
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const getClaims = async () => {
    try {
      const response = await fetch("https://ar-mvc-api.vercel.app/api/claims");
      if (!response.ok) {
        throw new Error("Failed to fetch claims");
      }
      const claims = await response.json();
      dispatch({ type: "get-claims", payload: { claims } });
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  const getAwards = async () => {
    try {
      const response = await fetch("https://ar-mvc-api.vercel.app/api/awards");
      if (!response.ok) {
        throw new Error("Failed to fetch awards");
      }
      const awards = await response.json();
      dispatch({ type: "get-awards", payload: { awards } });
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getInvoices();
    getClaims();
    getAwards();
  }, []);

  return {
    ...state,
    getUsers,
    getInvoices,
    getClaims,
    getAwards,
  };
};
