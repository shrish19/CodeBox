<h1>Checkout Single Page Application</h1>
<p>This CX is an implementation of Checkout journey using CX, Headless API and React.</p>
<br/>
<h4>Libraries Used</h4>
<ul>
<li>Please refer to package.json for Libraries Info</li>
<p><b>Note</b>I have tried to keep external libraries to minimum. This CX is built up using all open source and open libraries available. This demonstrates implementation outside of Liferay</p>
</ul>
<br/>
<h4>Setup Requirement</h4>
<ol>
<li>Create a commerce channel</li>
<li>Create a picklist having name as any but its erc should be :- commerceChannelPicklist</li>
<li>Set erc of the commerce channel to any and make an entry inside the created picklist with the same erc used in commerce channel. Name, Key and ERC of the picklist entry should be same as commerce channel erc</li>
<li>Preparation of Checkout page follows the same strategy of Liferay. Just instead of Liferay checkout, deploy this client-extension</li>
<li>Checkout button will redirect to this custom cx.</li>
</ol>
<br/>
<h4>Client Extension Details</h4>
<ul>
<li>OAuth2.0 Authentication. Token verfication happens automatically based on Admin User Creds</li>
<li>Billing Address (Compulsory)</li>
<li>Shipping Address (Compulsory)</li>
<li>Submit Button</li>
<p>I have not integrated the payment as it is process to create reusable components to create a SPA Checkout</p>
</ul>
<br/>
<p>Please feel free to reach out for any setup queries.</p>