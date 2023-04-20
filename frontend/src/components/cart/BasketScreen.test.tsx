import {fireEvent, render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import BasketScreen from "./BasketScreen"
import React from 'react';

describe("Basket Screen Unit Tests", () => {
    it("Renders basket screen with no error", ( ) => {
        render(<BasketScreen />)
    })
})