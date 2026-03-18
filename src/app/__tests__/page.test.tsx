import { fireEvent, render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
    it('renders an empty basket', () => {
        render(<Home />);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        const basketItem1Count = screen.queryByTestId('item-count-Item 1');
        const basketItem2Count = screen.queryByTestId('item-count-Item 2');
        const basketItem3Count = screen.queryByTestId('item-count-Item 3');
        const basketItem4Count = screen.queryByTestId('item-count-Item 4');

        expect(basketButton).toHaveTextContent('Basket: 0 items');
        expect(basketItem1Count).toBeNull();
        expect(basketItem2Count).toBeNull();
        expect(basketItem3Count).toBeNull();
        expect(basketItem4Count).toBeNull();

    });

    it('renders a basket with 1 item', async () => {
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        const item1Button = buttons[0];
        fireEvent.click(item1Button);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });
        const basketItem1Count = screen.getByTestId('item-count-Item 1');   
        const basketItem2Count = screen.queryByTestId('item-count-Item 2');
        const basketItem3Count = screen.queryByTestId('item-count-Item 3');
        const basketItem4Count = screen.queryByTestId('item-count-Item 4');

        expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
        expect(basketItem1Count).toHaveTextContent('Item 1 count: 1');
        expect(basketItem2Count).toBeNull();
        expect(basketItem3Count).toBeNull();
        expect(basketItem4Count).toBeNull();
    });

    it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        const item1Button = buttons[0];
        fireEvent.click(item1Button);
        const item2Button = buttons[1];
        fireEvent.click(item2Button);
        fireEvent.click(item2Button);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });
        const basketItem1Count = screen.getByTestId('item-count-Item 1');
        const basketItem2Count = screen.getByTestId('item-count-Item 2');
        const basketItem3Count = screen.queryByTestId('item-count-Item 3');
        const basketItem4Count = screen.queryByTestId('item-count-Item 4');

        expect(basketButton).toHaveTextContent(/Basket: 3 items$/);
        expect(basketItem1Count).toHaveTextContent('Item 1 count: 1');
        expect(basketItem2Count).toHaveTextContent('Item 2 count: 2');
    
        expect(basketItem3Count).toBeNull();
        expect(basketItem4Count).toBeNull();
    });
});
