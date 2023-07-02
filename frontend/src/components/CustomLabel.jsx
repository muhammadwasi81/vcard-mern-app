const CustomLabel = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-capitalize fw-semibold fs-6">
      {children}
    </label>
  );
};

export default CustomLabel;
