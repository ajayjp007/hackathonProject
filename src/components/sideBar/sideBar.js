import AddRoundSvg from '../../svg/addRoundSvg';
import '../../styles/Sidebar.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCreateNewThreadClick,
  changeCurrentOpenThreadAction,
} from '../../redux/reduxSlice';
import CpuSvg from '../../svg/cpuSvg';

const Sidebar = () => {
  const { currentOpenThread, threadList } = useAppSelector(
    (state) => state.reduxStore
  );

  const dispatch = useAppDispatch();

  const changeThreadListHandler = (number) => {
    dispatch(changeCurrentOpenThreadAction(number));
  };

  const toggleDarkModeHandler = (darkModeActive) => {
    const root = document.querySelector(':root');
    if (darkModeActive) {
      root.style.setProperty('--side-bar-color', '#000000');
      root.style.setProperty('--lightBodyColor', '#1B1B1B');
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--primary-button-color', '#1363DF');
      root.style.setProperty('--primary-button-hover-color', '#3573d0');
      root.style.setProperty('--accent-color', '#3573d0');
      root.style.setProperty(
        '--loading-box',
        'linear-gradient(90deg, #f2f2f2, #adadad, #eeeeee)'
      );
    } else {
      root.style.setProperty('--side-bar-color', '#f8f8f8');
      root.style.setProperty('--lightBodyColor', '#ffffff');
      root.style.setProperty('--text-color', '#000000');
      root.style.setProperty('--primary-button-color', '#6050dc');
      root.style.setProperty('--primary-button-hover-color', '#6f5eed');
      root.style.setProperty('--accent-color', '#f8f8f8');
      root.style.setProperty(
        '--loading-box',
        'linear-gradient(90deg, #000000, #252525, #323232)'
      );
    }
  };

  return (
    <div className="w-[249px] gap-[32px] flex flex-col justify-between border-r-[0.5px] side-bar-main-container border-[#D8D8D8] h-full p-[24px]">
      <div className="gap-[32px] flex flex-col">
        <p className="text-[32px] w-full text-center logo">NeuralSift</p>
        <button
          type="button"
          onClick={() => dispatch(changeCreateNewThreadClick(true))}
          className="w-full tracking-[0.02em] new-thread-btn nunito text-[16px] font-[500] flex gap-[8px] rounded-[6px] items-center p-[12px] justify-center"
        >
          <AddRoundSvg />
          New thread
        </button>
        <div className="flex flex-col gap-[8px]">
          <p className="secondary-text flex items-center gap-[8px] text-[14px] tracking-[0.02em] font-[400]">
            <CpuSvg />
            Open Threads
          </p>
          <div className="flex py-[8px] flex-col gap-[8px] h-[30rem] rounded-[6px] overflow-y-auto thread-list-container">
            {threadList.map((listItem, index) => {
              return (
                <button
                  onClick={() => changeThreadListHandler(index)}
                  className={
                    currentOpenThread === index
                      ? 'bg-[#323232] trucate text-left tracking-[0.02em] text-[#ffffff] rounded-[6px] p-[12px] text-[14px]'
                      : 'text-left truncate bg-[transparent] secondary-text tracking-[0.02em] text-[black] rounded-[6px] thread-btn p-[12px] text-[14px]'
                  }
                >
                  {listItem}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="border-[1px]"></div>
        <div className="flex flex-col items-start px-[16px] gap-[8px]">
          <button
            type="button"
            className="text-[14px] secondary-text flex items-center gap-[8px] font-[500] tracking-[0.02em] text-only-btn"
          >
            <input
              onChange={(e) => {
                toggleDarkModeHandler(e.target.checked);
              }}
              type="checkbox"
              class="toggle toggle-xs"
            />
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
