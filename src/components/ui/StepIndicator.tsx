type StepIndicatorProps = {
  currentStep: number;
};

const STEPS = [
  { num: 1, label: "Personal Info" },
  { num: 2, label: "Family Tree" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {STEPS.map((step, i) => (
        <div key={step.num} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step.num
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step.num}
          </div>
          <span
            className={`text-sm ${
              currentStep >= step.num ? "text-gray-900 font-medium" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
          {i < STEPS.length - 1 && <div className="w-8 h-px bg-gray-300" />}
        </div>
      ))}
    </div>
  );
}
