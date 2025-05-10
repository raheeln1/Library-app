import Login from "./Login";
import { screen,render } from "@testing-library/react";

describe("check my component element", ()=>{
    it("test user name",()=>{
        render(<Login />)
        const element = screen.getByTestId("e1")
            expect(element).toBeInTheDocument();
        
    })
    it("test user password",()=>{
        render(<Login />)
        const element = screen.getByTestId("e2")
            expect(element).toBeInTheDocument();
        
    })
    it("test user button",()=>{
        render(<Login />)
        const element = screen.getByTestId("e3")
            expect(element).toBeInTheDocument();
        
    })
})
