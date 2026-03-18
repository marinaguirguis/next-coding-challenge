# Michael's NextJS Coding Challenge

## Next Steps:

- Check the quantity for the product (in stock) and prevent the customer to add more than the quantity we have to the cart.

- Update the css for the home page to be more sylish like the product list display, making the cart with icon and number so the user can hover to see the list and the checkout.

- Change the basic table we use in the check out page.

- For localisation, update the static content in the website to accomodate what's needed here.

- Verify the locale in the URL that it matches the allowed locales and redirect to homepage if not

- To have a theme for the product and not magic numbers in the css.


## The Challenge:

Some newb has made a mess of this code. There are TODOs that need finishing off, broken and questionable tests and the code itself is inefficient.  
Please fix up whatever mess you find to get this piece of work working well.

### Extended tasks

- Our Product Manager wants a new 'checkout' page which should detail all of the items in the basket with their quantity and a total item quantity. Create this page.
- We've launched our new product API - [https://v0-api-endpoint-request.vercel.app/api/products](https://v0-api-endpoint-request.vercel.app/api/products) - can you please migrate the site to use the products from here - UK only for now. Our CTO is adamant that products should be available as soon as the page loads - no loading spinners.
- We've released a way of getting some more products. Its a bit slow so these can be displayed to the user after the initial products load please [https://v0-api-endpoint-request.vercel.app/api/more-products](https://v0-api-endpoint-request.vercel.app/api/more-products)
- We're launching in the states! When the user navigates to /us, prices should be displayed in dollars (USD) instead of GBP, and text should be localized for US users. Ensure the solution is scalable for future regions (e.g., Europe, Asia). Consider how you would handle currency formatting, locale-specific content, and dynamic routing.
- Run your applications tests when you push the branch to github
- Deploy your application when you push the branch to github

This is a [Next.js](https://nextjs.org/) project bootstrapped with `[create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)`.

### Getting Started

First, `npm install`, then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the testing and linting with `npm run test` and `npm run lint`.