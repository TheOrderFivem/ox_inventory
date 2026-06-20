import { flip, FloatingPortal, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../store';
import SlotTooltip from '../inventory/SlotTooltip';
import { isSlotWithItem } from '../../helpers';

const Tooltip: React.FC = () => {
  const hoverData = useAppSelector((state) => state.tooltip);
  const leftInventoryId = useAppSelector((state) => state.inventory.leftInventory.id);
  const rightInventoryId = useAppSelector((state) => state.inventory.rightInventory.id);
  const leftItems = useAppSelector((state) => state.inventory.leftInventory.items);
  const rightItems = useAppSelector((state) => state.inventory.rightInventory.items);

  const currentItem = useMemo(() => {
    if (!hoverData.open || !hoverData.item || !hoverData.inventoryId) return null;
    const activeItem = hoverData.item;
    const items =
      hoverData.inventoryId === leftInventoryId
        ? leftItems
        : hoverData.inventoryId === rightInventoryId
        ? rightItems
        : null;

    if (!items) return activeItem;
    
    const latestItem =
      items[activeItem.slot - 1] && items[activeItem.slot - 1].slot === activeItem.slot
        ? items[activeItem.slot - 1]
        : items.find((i) => i.slot === activeItem.slot);

    if (latestItem && latestItem.name === activeItem.name && isSlotWithItem(latestItem)) {
      return latestItem;
    }
    if (latestItem && latestItem.name !== activeItem.name) {
      return null;
    }
    return activeItem;
  }, [hoverData.open, hoverData.item, hoverData.inventoryId, leftInventoryId, rightInventoryId, leftItems, rightItems]);

  const { refs, context, floatingStyles } = useFloating({
    middleware: [flip(), shift(), offset({ mainAxis: 10, crossAxis: 10 })],
    open: hoverData.open,
    placement: 'right-start',
  });

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
  });

  const handleMouseMove = ({ clientX, clientY }: MouseEvent | React.MouseEvent<unknown, MouseEvent>) => {
    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          left: clientX,
          top: clientY,
          right: clientX,
          bottom: clientY,
        };
      },
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {isMounted && currentItem && hoverData.inventoryType && (
        <FloatingPortal>
          <SlotTooltip
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...styles }}
            item={currentItem}
            inventoryType={hoverData.inventoryType!}
          />
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
