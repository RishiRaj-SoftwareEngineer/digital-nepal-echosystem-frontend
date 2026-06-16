'use client';
import { STEP_LABELS } from '@/constants';
import { classNames } from '@/utils';

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-0">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === currentStep;
          const isDone = stepNum < currentStep;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={classNames(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                    isDone && 'bg-blue-600 text-white',
                    isActive && 'bg-blue-600 text-white ring-4 ring-blue-100',
                    !isActive && !isDone && 'bg-gray-200 text-gray-500',
                  )}
                >
                  {isDone ? '✓' : stepNum}
                </div>
                <span
                  className={classNames(
                    'text-sm font-medium hidden sm:inline',
                    (isActive || isDone) ? 'text-blue-700' : 'text-gray-500',
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={classNames(
                    'flex-1 h-0.5 mx-3',
                    isDone ? 'bg-blue-600' : 'bg-gray-200',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
