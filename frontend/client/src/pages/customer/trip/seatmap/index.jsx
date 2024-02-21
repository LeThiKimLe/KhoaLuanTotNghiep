import styles from './styles.module.css'
import seatmapData from '../../../../map/seatmapv2.json'
import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import seat_active from '../../../../assets/seat_active.svg'
import seat_disabled from '../../../../assets/seat_disabled.svg'
import seat_selecting from '../../../../assets/seat_selecting.svg'
import Seat from './Seat';

const SeatMap = ({ seatMap, booked, selectedSeats, handleSeatClick, turn, time }) => {

  const handleSeatChoose = (seatName) => {
    handleSeatClick(seatName)
  };

  return (
    <div className={styles.seat_area}>
      <i>{turn === true ? `Chuyến đi - ${time}` : `Chuyến về - ${time}`}</i>
      <div className={styles.seat_container}>
        <div className={styles.map_container}>
          {Array.from({ length: seatMap.floorNo }, (_, index) => index + 1).map((floorNumber) => (
            <div key={floorNumber} className={styles.seatfloor}>
              {seatMap.floorNo !== 1 && (
                <div className={styles.floor_title}>
                  {floorNumber === 1 ? 'Tầng dưới' : 'Tầng trên'}
                </div>
              )}
              {Array.from({ length: seatMap.rowNo }, (_, index) => index).map((rowNumber) => (
                <div key={rowNumber} className={styles.seatrow}>
                  {Array.from({ length: seatMap.colNo }, (_, index) => index).map((colNumber) => {
                    const filteredSeats = seatMap.seats.filter((seat) => seat.floor === floorNumber && seat.row === rowNumber && seat.col === colNumber);
                    return filteredSeats.length > 0 ? (
                      filteredSeats.map((seat) => (
                        <div key={seat.name}>
                          <Seat
                            seatName={seat.name}
                            key={`${floorNumber}-${rowNumber}-${colNumber}`}
                            state={booked.map((ticket) => ticket.seat).includes(seat.name) ? 'booked' : (selectedSeats.includes(seat.name) ? 'selecting' : 'active')}
                            chooseSeat={() => handleSeatChoose(seat.name)}
                          />
                        </div>
                      ))
                    ) : (
                      <div key={`${floorNumber}-${rowNumber}-${colNumber}`}>
                        <Seat
                          seatName="empty"
                          key={`${floorNumber}+${rowNumber}+${colNumber}`}
                          state="booked"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {
        turn === true && (
          <div className={styles.seat_note}>
            <h3>Chú thích</h3>
            <div className={styles['seat_note-decs']}>
              <img src={seat_active} alt="" />
              Còn trống
            </div>
            <div className={styles['seat_note-decs']}>
              <img src={seat_disabled} alt="" />
              Đã bán
            </div>
            <div className={styles['seat_note-decs']}>
              <img src={seat_selecting} alt="" />
              Đang chọn
            </div>
          </div>
        )
      }
    </div>
  );
};

export default memo(SeatMap);