import React from "react";
import "./Calendar.css";
import TimeSlot from "./TimeSlot";

const Calendar = (props) => {
    const { firstWeekDay, userMeetings, toggleDialog } = props;

    const getMeetingsInTimeSlot = (row, column) => {
        return userMeetings.filter(meet => {
            if (meet.dayInWeek === column && row >= meet.startTimeOfDay && row <= meet.endTimeOfDay) {
                return true;
            }
            return false;
        })
    }

    const getMeetingsCountInSameDay = (column) => {
        const result = userMeetings.filter(meet => {
            if (meet.dayInWeek === column) {
                return true;
            }
            return false;
        });

        return result.length;
    }

    const CalendarHead = () => {
        return (
            <thead>
                <tr>
                    <th><div className="CalendarHeaderCell"><p>Sunday</p><p>{firstWeekDay.getDate()}</p></div></th>
                    <th><div className="CalendarHeaderCell"><p>Monday</p><p>{firstWeekDay.getDate() + 1}</p></div></th>
                    <th><div className="CalendarHeaderCell"><p>Tuesday</p><p>{firstWeekDay.getDate() + 2}</p></div></th>
                    <th><div className="CalendarHeaderCell"><p>Wednesday</p><p>{firstWeekDay.getDate() + 3}</p></div></th>
                    <th><div className="CalendarHeaderCell"><p>Thursday</p><p>{firstWeekDay.getDate() + 4}</p></div></th>
                    <th><div className="CalendarHeaderCell"><p>Friday</p><p>{firstWeekDay.getDate() + 5}</p></div></th>
                    <th><div className="CalendarHeaderCell"><p>Saturday</p><p>{firstWeekDay.getDate() + 6}</p></div></th>
                </tr>
            </thead>

        )
    }

    const handleClickTimeSlot = (evt, row, column) => {
        // alert("clicked row=" + row + " column=" + column);
        // check if click on existing meeting by check evt.target
        if (evt.target.nodeName === "SPAN" && evt.target.title !== "") {
            // click on an existing event
            toggleDialog(row, column, evt.target.title);
        } else {
            // click empty timeslot
            toggleDialog(row, column, -1);
        }

    }

    const generateCalendarRows = () => {
        const rows = [];

        // generate 24 rows
        [...Array(24)].forEach((item, index) => rows.push(
            <tr key={index}>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 0)}><TimeSlot row={index} count={getMeetingsCountInSameDay(0)} meetings={getMeetingsInTimeSlot(index, 0)} /></td>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 1)}><TimeSlot row={index} count={getMeetingsCountInSameDay(1)} meetings={getMeetingsInTimeSlot(index, 1)} /></td>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 2)}><TimeSlot row={index} count={getMeetingsCountInSameDay(2)} meetings={getMeetingsInTimeSlot(index, 2)} /></td>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 3)}><TimeSlot row={index} count={getMeetingsCountInSameDay(3)} meetings={getMeetingsInTimeSlot(index, 3)} /></td>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 4)}><TimeSlot row={index} count={getMeetingsCountInSameDay(4)} meetings={getMeetingsInTimeSlot(index, 4)} /></td>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 5)}><TimeSlot row={index} count={getMeetingsCountInSameDay(5)} meetings={getMeetingsInTimeSlot(index, 5)} /></td>
                <td onClick={(evt) => handleClickTimeSlot(evt, index, 6)}><TimeSlot row={index} count={getMeetingsCountInSameDay(6)} meetings={getMeetingsInTimeSlot(index, 6)} /></td>
            </tr>
        ));

        return rows;
    }

    const generateTimeRows = () => {
        const rows = [];

        /* generate 25 rows of span indicating the time period of the day */
        [...Array(24)].forEach((item, index) => rows.push(
            <tr key={index}>
                <td >{index}</td>
            </tr>

        ));

        return rows;
    }
    return (
        <div className="tableContainer">
            <table className="timeSpace">
                <thead>
                    <tr><td></td></tr>
                </thead>
                <tbody>
                    {generateTimeRows()}
                </tbody>


            </table>
            <table className="calendar">
                <CalendarHead />

                <tbody>
                    {generateCalendarRows()}
                </tbody>

            </table>
        </div>
    )

}

export default Calendar;