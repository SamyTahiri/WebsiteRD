import { SOLUTION_STATUS, STEP_STATUS } from '@/data/content';
import './StatusChip.scss';

const LABELS = { ...STEP_STATUS, ...SOLUTION_STATUS };

function StatusChip({ status }) {
  return <span className={`status-chip status-chip--${status}`}>{LABELS[status]}</span>;
}

export default StatusChip;
