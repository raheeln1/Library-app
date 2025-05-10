import Login from "./Login";
import { screen,render } from "@testing-library/react";

import MyComponent from "./MyComponent";
import { screen,render } from "@testing-library/react";

describe("check my component element", ()=>{
    it("test user name",()=>{
        render(<MyComponent />)
        const element = screen.getByTestId("e1")
            expect(element).toBeInTheDocument();
        
    })
    it("test user password",()=>{
        render(<MyComponent />)
        const element = screen.getByTestId("e2")
            expect(element).toBeInTheDocument();
        
    })
    it("test user button",()=>{
        render(<MyComponent />)
        const element = screen.getByTestId("e3")
            expect(element).toBeInTheDocument();
        
    })
})
