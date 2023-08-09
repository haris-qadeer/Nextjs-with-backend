import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";
import Link from "next/link";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  };

  return (
    <Fragment>
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div>
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap ">
                <div className="p-2 ">
                  {feedbackData ? (
                    <p>{feedbackData.email}</p>
                  ) : (
                    <div>Fetch Data by Clicking the show details </div>
                  )}
                </div>
                <ul className="list-disc p-8">
                  {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                      {item.text}
                      <div className="px-4 text-white md:mx-6 md:p-12">
                        <button
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                          onClick={loadFeedbackHandler.bind(null, item.id)}
                        >
                          Show Details
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-2 ">
                  <Link
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
                    href="/"
                  >
                    Go Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
};
export default FeedbackPage;
