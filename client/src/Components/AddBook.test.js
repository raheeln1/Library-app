import AddBook from "./AddBook";
import { screen,render } from "@testing-library/react";

describe("To check form element",()=>{
    it("to check button",()=>{
        render(<AddBook />)
        const element= screen.getByRole("button")
        expect(element).toBeInTheDocument();
    })
    it("to check title",()=>{
        render(<AddBook />)
        const element= screen.getByRole("title")
        expect(element).toBeInTheDocument();
    })
    it("to check author",()=>{
        render(<AddBook />)
        const element= screen.getByRole("author")
        expect(element).toBeInTheDocument();
    })
})