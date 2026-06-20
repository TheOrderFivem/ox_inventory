import { flip, FloatingPortal, offset, shift, useFloating, useTransitionStyles } from '@floating-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../store';
import SlotTooltip from '../inventory/SlotTooltip';
import { isSlotWithItem } from '../../helpers';

const Tooltip: React.FC = () => {
  const hoverData = useAppSelector((state) => state.tooltip);
  const leftInventory = useAppSelector((state) => state.inventory.leftInventory);
  const rightInventory = useAppSelector((state) => state.inventory.rightInventory);

  const currentItem = useMemo(() => {
    if (!hoverData.open || !hoverData.item || !hoverData.inventoryType) return null;
    const isPlayer = hoverData.inventoryType === 'player';
    const inventory = isPlayer ? leftInventory : rightInventory;
    const slotIndex = hoverData.item.slot - 1;
    const latestItem = inventory?.items?.[slotIndex];
    if (latestItem && latestItem.name === hoverData.item.name && isSlotWithItem(latestItem)) {
      return latestItem;
    }
    if (latestItem && latestItem.name !== hoverData.item.name) {
      return null;
    }
    return hoverData.item;
  }, [hoverData.open, hoverData.item, hoverData.inventoryType, leftInventory, rightInventory]);

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
