import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calendar from './Calendar';

// Mock waste schedule data
const wasteSchedule = {
  "2024-10-03": "Plastic",
  "2024-10-10": "Organic",
  "2024-10-17": "Plastic",
  "2024-10-24": "Organic"
};

describe('Calendar Component Tests', () => {
  test('renders the calendar header with current month and year', () => {
    render(<Calendar wasteSchedule={wasteSchedule} />);
    
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentYear = new Date().getFullYear();
    
    expect(screen.getByText(`${currentMonth} ${currentYear}`)).toBeInTheDocument();
  });

  test('displays waste schedule on the correct dates', () => {
    render(<Calendar wasteSchedule={wasteSchedule} />);
    
    // Check if waste schedule appears on the correct days
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Plastic')).toBeInTheDocument();
    
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Organic')).toBeInTheDocument();
  });

  test('allows navigation to previous and next months', () => {
    render(<Calendar wasteSchedule={wasteSchedule} />);
    
    const previousMonthButton = screen.getByRole('button', { name: /previous/i });
    const nextMonthButton = screen.getByRole('button', { name: /next/i });
    
    // Check if next month navigation works
    fireEvent.click(nextMonthButton);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    expect(screen.getByText(nextMonth.toLocaleString('default', { month: 'long' }))).toBeInTheDocument();

    // Check if previous month navigation works
    fireEvent.click(previousMonthButton);
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    expect(screen.getByText(previousMonth.toLocaleString('default', { month: 'long' }))).toBeInTheDocument();
  });

  test('renders empty slots for days of the previous month', () => {
    render(<Calendar wasteSchedule={wasteSchedule} />);
    
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    
    // There should be empty slots equal to the first day of the month
    const emptySlots = screen.getAllByText('');
    expect(emptySlots.length).toBe(firstDayOfMonth);
  });

  test('does not show waste schedule on days with no waste collection', () => {
    render(<Calendar wasteSchedule={wasteSchedule} />);
    
    // Check that no waste is shown for days without a waste schedule
    const dayWithoutWaste = screen.getByText('4');  // Assuming Oct 4 has no waste collection
    expect(dayWithoutWaste).toBeInTheDocument();
    expect(screen.queryByText('4').nextSibling).toBeEmptyDOMElement();
  });
});
