import React, { useState } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { SlotWithItem } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const InventoryHotbar: React.FC = () => {
  const [hotbarVisible, setHotbarVisible] = useState(false);
  const items = useAppSelector(selectLeftInventory).items.slice(0, 5);
  // Helper function to get rarity color for star
  const getRarityColor = (item: any) => {
    if (!isSlotWithItem(item) || !item.metadata?.rarity) return null;

    const rarity = String(item.metadata.rarity).toLowerCase();
    const rarityColors: { [key: string]: string } = {
      // Original rarities
      'common': '#ffffff',
      'uncommon': '#1eff00',
      'rare': '#0070dd',
      'epic': '#a335ee',
      'legendary': '#ff8000',
      'artifact': '#e6cc80',
      'red': '#ff0000',
      'pink': '#ff69b4',
      'gold': '#ffd700',
      'rainbow': '#ffffff', // For rainbow, we'll handle this with CSS animation

      // Additional color-based rarities
      'silver': '#c0c0c0',
      'bronze': '#cd7f32',
      'copper': '#b87333',
      'blue': '#0099ff',
      'green': '#00ff66',
      'cyan': '#00ffff',
      'magenta': '#ff00ff',
      'yellow': '#ffff00',
      'orange': '#ff6600',
      'purple': '#9900ff',
      'lime': '#99ff00',
      'teal': '#008080',
      'indigo': '#4b0082',
      'violet': '#8a2be2',
      'maroon': '#800000',
      'navy': '#000080',
      'olive': '#808000',
      'aqua': '#00ffff',
      'fuchsia': '#ff00ff',
      'black': '#000000',
      'white': '#ffffff',
      'crimson': '#dc143c',
      'turquoise': '#40e0d0',
      'lavender': '#e6e6fa',
      'rose': '#ff007f',
    };

    return rarityColors[rarity] || null;
  };

  //stupid fix for timeout
  const [handle, setHandle] = useState<NodeJS.Timeout>();
  useNuiEvent('toggleHotbar', () => {
    if (hotbarVisible) {
      setHotbarVisible(false);
    } else {
      if (handle) clearTimeout(handle);
      setHotbarVisible(true);
      setHandle(setTimeout(() => setHotbarVisible(false), 3000));
    }
  });

  return (
    <SlideUp in={hotbarVisible}>
      <div className="hotbar-container">
        {items.map((item) => {
          const rarityColor = getRarityColor(item);
          return (
            <div
              className="hotbar-item-slot"
              style={{
                backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
              }}
              key={`hotbar-${item.slot}`}
            >
            {isSlotWithItem(item) && (
              <div className="item-slot-wrapper">
                <div className="hotbar-slot-header-wrapper">
                  <div className="inventory-slot-number">{item.slot}</div>
                  <div className="item-slot-info-wrapper">
                    <p>
                      {item.weight > 0
                        ? item.weight >= 1000
                          ? `${(item.weight / 1000).toLocaleString('en-us', {
                              minimumFractionDigits: 2,
                            })}kg `
                          : `${item.weight.toLocaleString('en-us', {
                              minimumFractionDigits: 0,
                            })}g `
                        : ''}
                    </p>
                    <p>{item.count ? item.count.toLocaleString('en-us') + `x` : ''}</p>
                  </div>
                </div>
                <div>
                  {item?.durability !== undefined && <WeightBar percent={item.durability} durability />}
                  {/* Rarity Star Indicator */}
                  {rarityColor && (
                    <div className="rarity-star-wrapper">
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`rarity-star ${item.metadata?.rarity === 'rainbow' ? 'rarity-star-rainbow' : ''}`}
                        style={{
                          color: item.metadata?.rarity === 'rainbow' ? undefined : rarityColor,
                          filter: `drop-shadow(0 0 3px ${rarityColor})`
                        }}
                      />
                    </div>
                  )}
                  <div className="inventory-slot-label-box">
                    <div className="inventory-slot-label-text">
                      {item.metadata?.label ? item.metadata.label : Items[item.name]?.label || item.name}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )})}
      </div>
    </SlideUp>
  );
};

export default InventoryHotbar;
