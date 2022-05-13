import React, { forwardRef } from "react";
import Button from "./Button";

const NameInput = (props, ref) => (

  <div ref={ref} className="card card--merchant">
    <img src="./images/avatar.jpg" alt="Merchant-Avatar" />
    <h4>{props.name}</h4>
    <p>
      {props.accountNumber} - {props.bank}
    </p>
    <Button
      color="primary"
      text="Proceed to payment"
      Click={() => props.Confirm()}
    />
  </div>
);

export default forwardRef(NameInput);

// export default forwardRef(MerchantCard);
