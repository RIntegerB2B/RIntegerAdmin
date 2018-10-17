import { MonthlyPlan } from './monthplan.model';
import {WeeklyPlan} from './weeklyplan.model';

export class DigitalMgmtStatus {
    bookingOrderId: string;
   monthName: string;
   year: string;
   monthlyPlan: [MonthlyPlan];
   weeklyPlan: [WeeklyPlan];
}
