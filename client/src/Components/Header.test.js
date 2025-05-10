import { screen,render } from "@testing-library/react";
import Header from "./Header";

//to writ edifferent test cases
describe("testing image and heading",()=>{
    

    it("test image",()=>{
        render(<Header />)
        const element = screen.getByAltText("bookslogo")
       // const element = screen.getByAltText(/logoimage/i)

        expect(element).toBeInTheDocument()
    })
    it("test Home",()=>{
        render(<Header />)
        const element = screen.getByText(/Home/i);
       // const element = screen.getByAltText(/logoimage/i)
        expect(element).toBeInTheDocument()
    })
})