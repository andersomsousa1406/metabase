import React from "react";

import OperatorSelector from "../filters/OperatorSelector";
import { formatField, singularize } from "metabase/lib/formatting";
import Icon from "metabase/components/Icon";

export default function FilterPopoverHeader({
  className,
  showFieldPicker,
  filter,
  onFilterChange,
  onClearField,
}) {
  const dimension = filter.dimension();
  const field = dimension.field();
  const tableDisplayName = field.table && field.table.displayName();

  const showOperatorSelector = !(field.isTime() || field.isDate());
  const showHeader = showFieldPicker || showOperatorSelector;

  const setOperator = operatorName => {
    if (filter.operator() !== operatorName) {
      onFilterChange(filter.setOperator(operatorName));
    }
  };

  return showHeader ? (
    <div className={className}>
      {showFieldPicker && (
        <div className="flex py1">
          <span
            className="cursor-pointer text-purple-hover transition-color flex align-center"
            onClick={onClearField}
          >
            <Icon name="chevronleft" size={16} />
            {tableDisplayName && (
              <h3 className="ml1">{singularize(tableDisplayName)}</h3>
            )}
          </span>
          {tableDisplayName && <h3 className="ml1">-</h3>}
          <h3 className="ml1 text-default">{formatField(field)}</h3>
        </div>
      )}
      {showOperatorSelector && (
        <OperatorSelector
          className={showFieldPicker ? "flex-align-right pl2" : "flex-full p1"}
          operator={filter.operatorName()}
          operators={filter.operatorOptions()}
          onOperatorChange={setOperator}
        />
      )}
    </div>
  ) : null;
}
