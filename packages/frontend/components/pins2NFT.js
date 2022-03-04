import useSWR from "swr";
import { useState, useEffect } from "react";
import { nft_storage } from "../helpers";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Pins({ ...props }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { data, error } = useSWR(
    `/api/pins/${props.user_id.user.name}`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  const pins = data;

  const callback = (data) => {
    console.log("show Alert", data);
    switch (data) {
      case "1":
        console.log("1");
        setAlertMessage("NFT is generated successfully. View it on OpenSea");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        break;
      case "2":
        console.log("2");
        setAlertMessage("NFT Minting is canceled.");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        break;
      case "0":
        setAlertMessage("Please, confirm in your Metamask.");
        console.log("0");
        setShowAlert(true);
        break;
      default:
        console.log(`callback case error`);
    }
  };

  function jsony(a) {
    return Object.entries(a)
      .map(([k, v]) => `${k}: ${v}`) // stringfy an json object a
      .join(`,\n `);
  }

  async function createPin(pin) {
    const result = await nft_storage.create(pin, callback);
    return result;
  }

  const convertPins2NFT = async (pin) => {
    await createPin(pin);
  };

  return (
    <div>
      {showAlert && (
        <div class="alert alert-info">
          <div class="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <label>{alertMessage}</label>
          </div>
        </div>
      )}
      <div className="flex flex-wrap">
        {pins.map((pin, i) => (
          <div className="flex flex-nowrap">
            <div className="card w-72 card-bordered card-compact lg:card-normal">
              <figure>
                <img src={`${pin.images["237x"].url}`}></img>
              </figure>
              <div className="card-body">
                <p>{pin.description}</p>
                <div className="justify-end card-actions">
                  {!showAlert && (
                    <button
                      type="button"
                      onClick={() => {
                        convertPins2NFT(pin);
                      }}
                      className="btn btn-secondary"
                    >
                      convert to NFT
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
