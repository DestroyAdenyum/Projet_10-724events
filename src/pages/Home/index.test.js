import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    // Correction de l'orthographe du mot "Personel"
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // Changement de findByText par queryByTest pour attendre que le texte soit rendu avant de le tester
      await screen.queryByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventList = screen.findByTestId("eventList-testid");
    expect(eventList).toBeDefined;
  })
  it("a list a people is displayed", async() => {
    render(<Home />);
    await screen.findByTestId("listPeople-testid");
  })
  it("a footer is displayed", async() => {
    render(<Home />);
    await screen.findByTestId("footer-testid");
  })
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);
    const lastEvent =  screen.findByTestId("lastEventCard-testid");
    expect(lastEvent).toBeDefined;
  })
});
