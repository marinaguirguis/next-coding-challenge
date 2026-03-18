import { render, screen } from '@testing-library/react';
import Checkout from '@/app/[locale]/checkout/page';
import { useCart } from '@/app/cart-context';

let mockLocale = 'uk';

jest.mock('next-intl', () => ({
    useLocale: () => mockLocale,
}));

jest.mock('@/i18n/routing', () => ({
    Link: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

jest.mock('@/app/cart-context', () => ({
    useCart: jest.fn(),
}));

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('Checkout', () => {
    beforeEach(() => {
        mockLocale = 'uk';
    });

    it('renders empty state when the cart is empty', () => {
        mockUseCart.mockReturnValue({
            cartItems: [],
            totalItemsCount: 0,
            addToCart: jest.fn(),
        });

        render(<Checkout />);

        expect(screen.getByText('Your basket is empty.')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Browse products/i })).toBeInTheDocument();
        expect(screen.queryByRole('table')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Place order/i })).not.toBeInTheDocument();
    });

    it('renders cart items with correct data and total price for UK locale', () => {
        mockUseCart.mockReturnValue({
            cartItems: [
                { id: 1, name: 'Silk Blouse', price: 85.00, quantity: 2 },
                { id: 2, name: 'Linen Trousers', price: 60.00, quantity: 3 },
            ],
            totalItemsCount: 5,
            addToCart: jest.fn(),
        });

        render(<Checkout />);

        expect(screen.getByText('Silk Blouse')).toBeInTheDocument();
        expect(screen.getByText('Linen Trousers')).toBeInTheDocument();

        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();

        expect(screen.getByText('£85.00')).toBeInTheDocument();
        expect(screen.getByText('£60.00')).toBeInTheDocument();

        // Subtotals: 85 * 2 = £170.00, 60 * 3 = £180.00
        expect(screen.getByText('£170.00')).toBeInTheDocument();
        expect(screen.getByText('£180.00')).toBeInTheDocument();

        expect(screen.getByText('5')).toBeInTheDocument();

        // Total price: (85 * 2) + (60 * 3) = 170 + 180 = £350.00
        expect(screen.getByText('£350.00')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Place order/i })).toBeInTheDocument();
        expect(screen.queryByText('Your basket is empty.')).not.toBeInTheDocument();
    });

    it('renders cart items with USD formatting for US locale', () => {
        mockLocale = 'us';

        mockUseCart.mockReturnValue({
            cartItems: [
                { id: 1, name: 'Silk Blouse', price: 105.00, quantity: 2 },
                { id: 2, name: 'Linen Trousers', price: 75.00, quantity: 3 },
            ],
            totalItemsCount: 5,
            addToCart: jest.fn(),
        });

        render(<Checkout />);

        expect(screen.getByText('Silk Blouse')).toBeInTheDocument();
        expect(screen.getByText('Linen Trousers')).toBeInTheDocument();

        expect(screen.getByText('$105.00')).toBeInTheDocument();
        expect(screen.getByText('$75.00')).toBeInTheDocument();

        // Subtotals: 105 * 2 = $210.00, 75 * 3 = $225.00
        expect(screen.getByText('$210.00')).toBeInTheDocument();
        expect(screen.getByText('$225.00')).toBeInTheDocument();

        // Total price: 210 + 225 = $435.00
        expect(screen.getByText('$435.00')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Place order/i })).toBeInTheDocument();
        expect(screen.queryByText('Your basket is empty.')).not.toBeInTheDocument();
    });
});
