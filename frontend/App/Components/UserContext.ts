import { createContext } from "react";
import { UserValues } from "../Sources/Models/models";
export const UserContext = createContext<UserValues>({ id: "", email: "", favoriteBooks: [], password: "", readedBooks: [], username: "" })