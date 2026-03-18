import { act, fireEvent, render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { CartProvider } from '@/app/cart-context';

jest.mock('@/lib/api/products.server', () => ({
    getProducts: jest.fn().mockResolvedValue({
        products: [
            { id: 1, name: { uk: 'Item 1', us: 'Item 1' }, price: { gbp: 10, usd: 12 }, stock: 5 },
            { id: 2, name: { uk: 'Item 2', us: 'Item 2' }, price: { gbp: 20, usd: 24 }, stock: 5 },
            { id: 3, name: { uk: 'Item 3', us: 'Item 3' }, price: { gbp: 30, usd: 36 }, stock: 5 },
            { id: 4, name: { uk: 'Item 4', us: 'Item 4' }, price: { gbp: 40, usd: 48 }, stock: 5 },
        ],
    }),
}));

jest.mock('@/lib/api/products.client', () => ({
    useMoreProducts: jest.fn().mockReturnValue({
        products: [],
        isLoading: false,
        error: null,
    }),
}));

const renderHome = async () => {
    const homeElement = await Home();
    await act(async () => {
        render(<CartProvider>{homeElement}</CartProvider>);
    });
};

describe('Home', () => {
    it('renders an empty basket', async () => {
        await renderHome();

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
        await renderHome();

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
        await renderHome();

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
