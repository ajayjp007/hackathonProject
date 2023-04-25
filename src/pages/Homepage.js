import '../styles/Homepage.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import EmptySearchIcon from '../svg/emptySearchIcon';
import Sidebar from '../components/sideBar/sideBar';
import { useEffect, useState } from 'react';
import Modal from '../components/modal/modal';
import {
  changeCreateNewThreadClick,
  createThread,
  documentationQueryAction,
  updateDocumentQueryAnswerAction,
  submitQuery,
  updateAnswerAction,
  updateDbQueryAnswerAction,
  dbQueryAction,
  updateRbiCircularAction,
  rbiCircularQueryAction,
} from '../redux/reduxSlice';
import SunSvg from '../svg/sunSvg';
import AirplaneSvg from '../svg/airplaneSvg';
import {
  makeDbQueryApi,
  makeDocumentationQueryApi,
  makeNotionQueryApi,
  makeRbiQueryApi,
} from '../apiCalls/api';

const Homepage = () => {
  const { createNewThreadClick, currentThreadsState, currentOpenThread } =
    useAppSelector((state) => state.reduxStore);
  const [selectedThreadType, setSelectedThreadType] = useState('');
  const [alertNoThreadTypeSelected, setAlertNoThreadTypeSelected] =
    useState(false);
  const dispatch = useAppDispatch();
  const [threadInputName, setThreadInputName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [secondFieldInputVal, setSecondFieldInputVal] = useState('');

  const popularSearches = [
    {
      heading: 'Explain quantum computing in simple terms',
      content:
        'A quantum computer is a computer that exploits quantum mechanical phenomena.',
    },
    {
      heading: 'How to have a good work-life balance?',
      content:
        'Here are some tips to have a good work-life balance: Plan ahead to combine work activities with leisure, social, or fitness activities',
    },
    {
      heading: 'Right way to clean your monitor',
      content:
        'To clean your monitor, use a clean microfiber cloth to gently wipe the screen and remove dust and fingerprints.',
    },
    {
      heading: 'Tips to optimise your LinkedIn profile',
      content:
        'To optimize your LinkedIn profile, you can follow these tips: Complete your profile with all relevant information',
    },
  ];

  const submitNewThreadHandler = () => {
    if (selectedThreadType === '') {
      setAlertNoThreadTypeSelected(true);
    } else if (selectedThreadType !== '' && threadInputName.trim() !== '') {
      dispatch(createThread({ name: threadInputName, selectedThreadType }));
      dispatch(changeCreateNewThreadClick(false));
      setAlertNoThreadTypeSelected(false);
      setSelectedThreadType('');
      setThreadInputName('');
    }
  };

  const submitQueryHandler = async (e) => {
    console.log('comes inside here', currentThreadsState);
    if (currentOpenThread === 0) {
      dispatch(
        submitQuery({
          threadName: currentThreadsState[currentOpenThread].threadName,
          question: searchVal,
        })
      );
      const response = await makeNotionQueryApi(searchVal);
      dispatch(
        updateAnswerAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          answer: response.answer,
          question: searchVal,
        })
      );
    } else if (currentOpenThread === 1) {
      dispatch(
        documentationQueryAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          question: searchVal,
        })
      );
      const response = await makeDocumentationQueryApi(searchVal);
      dispatch(
        updateDocumentQueryAnswerAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          answer: response.answer,
          question: searchVal,
        })
      );
    } else if (currentOpenThread === 2) {
      dispatch(
        dbQueryAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          question: searchVal + secondFieldInputVal,
        })
      );
      const response = await makeDbQueryApi(searchVal + secondFieldInputVal);
      dispatch(
        updateDbQueryAnswerAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          answer: response.answer,
          question: searchVal + secondFieldInputVal,
        })
      );
    } else if (currentOpenThread === 3) {
      dispatch(
        rbiCircularQueryAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          question: searchVal,
        })
      );
      const response = await makeRbiQueryApi(searchVal);
      dispatch(
        updateRbiCircularAction({
          threadName: currentThreadsState[currentOpenThread].threadName,
          answer: response.answer,
          question: searchVal,
        })
      );
    }
    setSearchVal('');
    setSecondFieldInputVal('');
  };

  useEffect(() => {
    setSearchVal('');
    setSecondFieldInputVal('');
  }, [currentOpenThread]);

  return (
    <div className="flex w-[100vw] h-[100vh] items-center relative">
      {createNewThreadClick && (
        <Modal
          modalHeading={
            <div className="text-[14px] border-b-[1px] border-[#e6e6e6] text-[#3B3B3B] not-italic px-[16px] py-[12px] flex items-center">
              You’re about to add a new thread
            </div>
          }
          modalBody={
            <div className="flex flex-col items-center gap-[16px] pt-[20px] px-[16px] pb-[40px]">
              <p className="font-[400] inter w-full text-[12px] text-[#575C61]">
                Pick any one of the following type. Once picked these threads
                cannot be modified later.
              </p>
              <form className="w-full flex-col flex px-[16px] gap-[16px]">
                <div className="flex items-center gap-[8px] text-[12px] font-[200] inter text-[#575C61]">
                  <input
                    checked={selectedThreadType === 'notion'}
                    onClick={() => {
                      if (selectedThreadType === 'notion') {
                        setSelectedThreadType('');
                      } else {
                        setSelectedThreadType('notion');
                      }
                      setAlertNoThreadTypeSelected(false);
                    }}
                    type="checkbox"
                  />
                  <label
                    onClick={() => {
                      if (selectedThreadType === 'notion') {
                        setSelectedThreadType('');
                      } else {
                        setSelectedThreadType('notion');
                      }
                      setAlertNoThreadTypeSelected(false);
                    }}
                  >
                    Notion
                  </label>
                </div>
                <div className="flex items-center gap-[8px] text-[12px] font-[200] inter text-[#575C61]">
                  <input
                    checked={selectedThreadType === 'pdf'}
                    onClick={() => {
                      if (selectedThreadType === 'pdf') {
                        setSelectedThreadType('');
                      } else {
                        setSelectedThreadType('pdf');
                      }
                      setAlertNoThreadTypeSelected(false);
                    }}
                    type="checkbox"
                  />
                  <label
                    onClick={() => {
                      if (selectedThreadType === 'pdf') {
                        setSelectedThreadType('');
                      } else {
                        setSelectedThreadType('pdf');
                      }
                      setAlertNoThreadTypeSelected(false);
                    }}
                  >
                    Pdf
                  </label>
                </div>
                <div className="flex items-center gap-[8px] text-[12px] font-[200] inter  text-[#575C61]">
                  <input
                    checked={selectedThreadType === 'url'}
                    onClick={() => {
                      if (selectedThreadType === 'url') {
                        setSelectedThreadType('');
                      } else {
                        setSelectedThreadType('url');
                      }
                      setAlertNoThreadTypeSelected(false);
                    }}
                    type="checkbox"
                  />
                  <label
                    onClick={() => {
                      if (selectedThreadType === 'url') {
                        setSelectedThreadType('');
                      } else {
                        setSelectedThreadType('url');
                      }
                      setAlertNoThreadTypeSelected(false);
                    }}
                  >
                    Url
                  </label>
                </div>
                {alertNoThreadTypeSelected && (
                  <p className="text-[12px] text-red-500">
                    Please select one of the above given options
                  </p>
                )}
                <div className="flex flex-col gap-[8px] text-[12px] inter  text-[#575C61]">
                  <label>What would you like to call the thread?</label>
                  <input
                    onChange={(e) => setThreadInputName(e.target.value)}
                    type="text"
                    placeholder="Pdf thread"
                    className="border-[1px] border-[D8D8D8] rounded-[6px] px-[8px] py-[4px] text-[12px] thread-name-input"
                  />
                </div>
              </form>
            </div>
          }
          modalFooter={
            <div className="flex items-center bg-[#F6F6F6] rounded-b-[10px] justify-end gap-[16px] py-[8px] px-[16px] w-full">
              <button
                onClick={() => {
                  dispatch(changeCreateNewThreadClick(false));
                  setAlertNoThreadTypeSelected(false);
                  setSelectedThreadType('');
                }}
                className="text-[#3B3B3B] rounded-[6px] rounded-xx[5px] p-[10px_16px] text-[14px] hover:p-[10px_15.5px] hover:border-[0.5px] hover:border-[#554ef159] hover:bg-[#ffffff] "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  submitNewThreadHandler();
                }}
                className="bg-[#17B169] w-fit min-w-[80px] border-[0.5px]  rounded-[5px] px-[16px] py-[10px] text-[#F9F9F9] font-[600] text-[14px] hover:bg-[#018749]"
              >
                Add Thread
              </button>
            </div>
          }
        />
      )}
      <Sidebar />
      <div className="w-full h-full relative">
        {currentThreadsState[currentOpenThread].currentState &&
        currentThreadsState[currentOpenThread].currentState.length === 0 ? (
          <div className="py-[24px] px-[180px] justify-end main-chat-container w-full h-full flex flex-col gap-[16px]">
            <div className="flex items-center justify-center">
              <EmptySearchIcon />
            </div>
            <div className="flex items-center justify-center nunito w-full">
              <div className="flex flex-col gap-[16px] w-full">
                <div className="nunito secondary-text tracking-[0.02em] font-[600] m-[auto] py-[24xxpx] text-[16px] flex items-center gap-[8px]">
                  <SunSvg />
                  Search for anything and everything related to hyperverge
                </div>
                <div className="border-[1px] w-[100%]"></div>
                {/* <div className="flex items-center gap-[16px] flex-wrap w-full">
                  {popularSearches.map((item) => {
                    return (
                      <button className="flex flex-col gap-[8px] text-left border-[1px] border-[#D8D8D8] text-[14px] font-[800] p-[16px] bg-[#F8F8F8] rounded-[6px] cursor-pointer w-[48%] h-fit example-cards">
                        {item.heading}
                        <p className="text-[12px] break-word w-full truncate break-words font-[400]">
                          {item.content}
                        </p>
                      </button>
                    );
                  })}
                </div> */}
                {currentOpenThread === 2 ? (
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="flex items-center w-[100%] gap-[16px] rounded-[6px] input-box-outer-container  h-[50px]  border-[1.5px] border-[#D8D8D8] px-[16px]">
                      <input
                        onChange={(e) => {
                          setSearchVal(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.keyCode === 13 &&
                            secondFieldInputVal.length > 0 &&
                            searchVal.length > 0
                          ) {
                            submitQueryHandler();
                          }
                        }}
                        value={searchVal}
                        placeholder="Please enter the date range and any additional filtering conditions for the SQL query."
                        className="w-full nunito bg-[transparent] font-[700] rounded-[6px] py-[8px] text-[14px] main-input"
                      />
                    </div>
                    <div className="flex items-center w-full gap-[16px] rounded-[6px] input-box-outer-container  h-[50px]  border-[1.5px] border-[#D8D8D8] px-[16px]">
                      <input
                        onChange={(e) => {
                          setSecondFieldInputVal(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.keyCode === 13 &&
                            secondFieldInputVal.length > 0 &&
                            searchVal.length > 0
                          ) {
                            submitQueryHandler();
                          }
                        }}
                        value={secondFieldInputVal}
                        placeholder="Please enter the operation you would like to perform on the extracted data (e.g. view, export, analyze). "
                        className="nunito w-full bg-[transparent] font-[700] rounded-[6px] py-[8px] text-[14px] main-input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          secondFieldInputVal.length > 0 &&
                          searchVal.length > 0
                        ) {
                          submitQueryHandler();
                        }
                      }}
                      className="w-full p-[12px] text-[14px] rounded-[6px] new-thread-btn "
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-[16px] rounded-[6px] input-box-outer-container  h-[50px]  border-[1.5px] border-[#D8D8D8] px-[16px]">
                    <input
                      onChange={(e) => {
                        setSearchVal(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          submitQueryHandler();
                        }
                      }}
                      value={searchVal}
                      placeholder="Send some message..."
                      className="w-full nunito bg-[transparent] font-[700] rounded-[6px] py-[8px] text-[14px] main-input"
                    />
                    <button type="button" onClick={submitQueryHandler}>
                      <AirplaneSvg />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-[24px] absolute overflow-auto main-chat-container w-full h-full flex flex-col gap-[16px]">
            {currentThreadsState[currentOpenThread].currentState.map((item) => {
              return (
                <div className="flex flex-col">
                  <div className="text-[14px] nunito tracking-[0.02em] font-[900] question-container border-b-[2px] p-[16px]">
                    {item.question}
                  </div>
                  {item.answer !== '' && item.answer !== undefined ? (
                    <div className="text-[14px] secondary-text nunito tracking-[0.02em] leading-[22px] p-[24px]">
                      {item.answer}
                    </div>
                  ) : (
                    <div className="w-full h-fit p-[24px] flex flex-col gap-[4px]">
                      <div className="w-[10px] h-[16px] loading"></div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="px-[160px] flex flex-col gap-[32px]  justify-end h-full sticky top-0">
              <div className="flex items-center gap-[8px]">
                {currentOpenThread === 2 ? (
                  <div className="flex flex-col gap-[16px] w-full">
                    <div className="flex items-center w-[100%] gap-[16px] rounded-[6px] input-box-outer-container  h-[50px]  border-[1.5px] border-[#D8D8D8] px-[16px]">
                      <input
                        onChange={(e) => {
                          setSearchVal(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.keyCode === 13 &&
                            secondFieldInputVal.length > 0 &&
                            searchVal.length > 0
                          ) {
                            submitQueryHandler();
                          }
                        }}
                        value={searchVal}
                        placeholder="Please enter the date range and any additional filtering conditions for the SQL query."
                        className="w-full nunito bg-[transparent] font-[700] rounded-[6px] py-[8px] text-[14px] main-input"
                      />
                    </div>
                    <div className="flex items-center w-full gap-[16px] rounded-[6px] input-box-outer-container  h-[50px]  border-[1.5px] border-[#D8D8D8] px-[16px]">
                      <input
                        onChange={(e) => {
                          setSecondFieldInputVal(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.keyCode === 13 &&
                            secondFieldInputVal.length > 0 &&
                            searchVal.length > 0
                          ) {
                            submitQueryHandler();
                          }
                        }}
                        value={secondFieldInputVal}
                        placeholder="Please enter the operation you would like to perform on the extracted data (e.g. view, export, analyze). "
                        className="nunito w-full bg-[transparent] font-[700] rounded-[6px] py-[8px] text-[14px] main-input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          secondFieldInputVal.length > 0 &&
                          searchVal.length > 0
                        ) {
                          submitQueryHandler();
                        }
                      }}
                      className="w-full p-[12px] text-[14px] rounded-[6px] new-thread-btn "
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="flex w-full items-center gap-[16px] rounded-[6px] input-box-outer-container  h-[50px]  border-[1.5px] border-[#D8D8D8] px-[16px]">
                    <input
                      onChange={(e) => {
                        setSearchVal(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          submitQueryHandler();
                        }
                      }}
                      value={searchVal}
                      placeholder="Send some message..."
                      className="w-full nunito bg-[transparent] font-[700] rounded-[6px] py-[8px] text-[14px] main-input"
                    />
                    <button type="button" onClick={submitQueryHandler}>
                      <AirplaneSvg />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
