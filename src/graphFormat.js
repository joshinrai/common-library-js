/* eslint-disable no-param-reassign */
/*
 * @Author: xushenlei joshinrai@163.com
 * @Date: 2023-12-29 11:25:13
 * @LastEditors: xushenlei joshinrai@163.com
 * @LastEditTime: 2024-01-22 14:06:07
 * @FilePath: /ddw-development-web/src/pages/DataDevelopment/pages/NewWarehouseDesign/components/flow/graphFormat.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import cloneDeep from 'lodash/cloneDeep';
import G6 from '@antv/g6';

const transTwoDim = (twoDimArray: any) => {
  const [stack, resultArray]: any = [[], []];
  twoDimArray.forEach((item: any) => {
    if (item === '') {
      if (!['', void 0].includes(stack[0])) {
        resultArray.push(stack.shift());
      } else resultArray.push(item);
    } else if (Array.isArray(item) && item.length === 1) {
      stack.push(...item);
      resultArray.push(stack.shift());
    } else {
      stack.push(...item);
      resultArray.push('');
      const tempArray: any = [];
      while (resultArray?.at?.(-1) === '' && stack[0]) {
        resultArray.pop();
        tempArray.push(stack.shift());
      }
      resultArray.push(...tempArray);
    }
  });
  resultArray.push(...stack);
  return resultArray?.reduce?.((map: any, item: any, index: number) => {
    if (item !== '') {
      map.set(item?.id, index);
    }
    return map;
  }, new Map()) ?? new Map();
}

const setLineLocation = (nodes: any, resultIndexMap: any, level: number, y: number, maxLevelLength: number, sourceTargetMap: any, targetSourceMap: any) => {
  const resultMap = new Map();
  nodes.forEach((id: any) => {
    const ids = y > 0 ? (targetSourceMap.get(id) ?? []) : (sourceTargetMap.get(id) ?? []);
    const sumIndex = ids.reduce((s: any, idi: any) => {
      let resultId = resultIndexMap.get(`${idi}`);
      if (`${resultId}` === 'NaN' || resultId === void 0) resultId = resultIndexMap.get(`${id}_${idi}_${level - y}`) || 0;
      return s + resultId;
    }, 0);
    const averageIndex = sumIndex / ids.length;
    const roundIndex = Math.round(averageIndex);
    const key = `${!!roundIndex ? roundIndex : 0}`;
    const locationItems: any = resultMap.get(key) ?? [];
    locationItems.push({ id, averageIndex, roundIndex });
    resultMap.set(key, locationItems);
  });
  const twoDimArray = new Array(maxLevelLength).fill('');
  const keys = resultMap.keys();
  for (let i = 0; i < resultMap.size; i += 1) {
    const key = keys.next().value;
    twoDimArray.splice(key, 1, resultMap.get(key).sort((a: any, b: any) => a.averageIndex - b.averageIndex));
  }
  return transTwoDim(twoDimArray);
};

const setLevelMap = (levelMap: any, dummyMap: any, resultIndexMap: any, level: number, y: number, maxLevelLength: number, nodeIdMap: any, levelMaxItemWidth: any, status: boolean, env: boolean, sourceTargetMap?: any, targetSourceMap?: any) => {
  const [levelNodes, dummyNodes, nodesRes]: any = [levelMap?.get?.(level) ?? [], dummyMap?.get?.(level) ?? [], []];
  for (let i = 0; i < maxLevelLength; i += 1) nodesRes.push({ index: i });
  const nodes = [...levelNodes, ...dummyNodes];
  if (nodes?.length && y === 0) {
    nodes.forEach((id: any, index: number) => {
      resultIndexMap.set(`${id}`, index);
      const item: any = nodeIdMap.get(id) ?? { data: {} };
      const [itemData, disabled, canExpand, switchBool] = [item?.data ?? { label: item?.label }, item?.disabled, item?.canExpand, status && env && `${item?.data?.jobType}` !== '6'];
      let [initWidth, label] = [28, itemData.label];
      if (env) label = label?.replace?.(/^test_|.sql$/g, '') ?? label;
      initWidth = initWidth + (disabled ? 8 : 0) + (canExpand ? 12 : 0) + (switchBool ? 12 : 0);
      let letterWidth = (label?.split?.('') ?? [])?.reduce?.((s: any, l: any) => s += G6.Util.getLetterWidth(l, 10), initWidth) ?? 0;
      letterWidth = Math.ceil(letterWidth);
      if (letterWidth > (levelMaxItemWidth[index] ?? 0)) levelMaxItemWidth?.splice?.(index, 1, letterWidth);
      const result = {
        ...item,
        ...itemData,
        index,
        y: y * 100,
        id: `${item?.id}`,
        letterWidth,
      };
      nodesRes.splice(index, 1, result);
    });
  } else if (nodes?.length) {
    const map = setLineLocation(nodes, resultIndexMap, level, y, maxLevelLength, sourceTargetMap, targetSourceMap);
    dummyNodes.forEach((id: any) => resultIndexMap.set(`${id}`, map.get(id)));
    levelNodes.forEach((id: any) => {
      const index = map.get(id);
      resultIndexMap.set(`${id}`, index);
      const item: any = nodeIdMap.get(id) ?? { data: {} };
      const [itemData, disabled, canExpand, switchBool] = [item?.data ?? { label: item?.label }, item?.disabled, item?.canExpand, status && env && `${item?.data?.jobType}` !== '6'];
      if (itemData === void 0) {
        debugger
      }
      let [initWidth, label] = [28, itemData.label];
      if (env) label = label?.replace?.(/^test_|.sql$/g, '') ?? label;
      initWidth = initWidth + (disabled ? 8 : 0) + (canExpand ? 12 : 0) + (switchBool ? 12 : 0);
      let letterWidth = (label?.split?.('') ?? [])?.reduce?.((s: any, l: any) => s += G6.Util.getLetterWidth(l, 10), initWidth) ?? 0;
      letterWidth = Math.ceil(letterWidth);
      if (letterWidth > (levelMaxItemWidth[index] ?? 0)) levelMaxItemWidth?.splice?.(index, 1, letterWidth);
      nodesRes.splice(index, 1, {
        ...item,
        ...item?.data,
        index,
        y: y * 100,
        id: `${item?.id}`,
        letterWidth,
      });
    });
  }
  if (nodesRes.length) levelMap.set(level, nodesRes.sort((a: any, b: any) => a?.index - b?.index));
};

const graphFormat = (list: any, status: boolean, env: boolean) => {
  const [cloneList, hiddenItems, formatNodes, edges, nodeIdMap, levelMaxItemWidth]: any = [cloneDeep(list), [], [], [], new Map(), []];

  cloneList?.forEach?.((item: any) => {
    if (item.visible === false) {
      hiddenItems.push(item);
    } else if (item?.shape === 'dag-node' || item.type === 'blood_item') {
      formatNodes.push(item);
      nodeIdMap.set(`${item.id}`, item);
    } else if (item?.shape === 'dag-edge' || item.type === 'blood_line') {
      edges.push(item);
    }
  });

  const [sourceSet, targetSet, rootNodes, sourceTargetMap, targetSourceMap]: any = [new Set(), new Set(), [], new Map(), new Map()];

  edges?.forEach?.((item: any) => {
    const sCell = item?.source?.cell ?? item?.source;
    sourceSet.add(`${sCell}`);

    const tCell = item?.target?.cell ?? item?.target;
    targetSet.add(`${tCell}`);

    const tCellList = sourceTargetMap.get(`${sCell}`) || [];
    tCellList.push(`${tCell}`);
    sourceTargetMap.set(`${sCell}`, tCellList);

    const sCellList = targetSourceMap.get(`${tCell}`) || [];
    sCellList.push(`${sCell}`);
    targetSourceMap.set(`${tCell}`, sCellList);
  });

  sourceSet?.forEach?.((cell: any) => {
    if (!targetSet.has(cell)) rootNodes.push(cell);
  });

  let [levelDeep, maxLevelLength, maxLevel]: any = [0, 0, 0];

  if (!edges.length) rootNodes.push(...(formatNodes?.map?.(({ id }: any) => `${id}`) ?? []));

  const levelMap: any = new Map([
    [0, [...new Set(rootNodes)]]
  ]);

  let currentNodes = cloneDeep([...new Set(rootNodes)]);
  while(currentNodes.length) {
    currentNodes = [...new Set(currentNodes?.map?.((id: any) => sourceTargetMap.get(id))?.flat?.(Infinity)?.filter?.(Boolean) ?? [])]?.filter?.(Boolean) ?? [];
    if (currentNodes.length) {
      levelDeep++;
      levelMap.set(levelDeep, currentNodes);
    }
  }

  const [nodeLevelMap, dummyMap, resultIndexMap] = [new Map(), new Map(), new Map()];

  for (let i = levelDeep; i >= 0; i -= 1) {
    levelMap.set(i, levelMap.get(i)?.filter?.((id: any) => {
      const bool = !nodeLevelMap.get(id);
      if (id && bool) nodeLevelMap.set(id, i);
      return bool;
    }) ?? []);
  }

  edges?.forEach?.((edge: any) => {
    const source = `${edge?.source?.cell ?? edge?.source}`;
    const target = `${edge?.target?.cell ?? edge?.target}`;
    const sourceLevel = nodeLevelMap.get(source) ?? 0;
    const targetLevel = nodeLevelMap.get(target) ?? 0;
    if (targetLevel - sourceLevel > 1) {
      let sourceId = source;

      for (let i = sourceLevel + 1; i < targetLevel; i += 1) {
        const dummyNodeId = `${source}_${target}_${i}`;

        const tCellList = sourceTargetMap.get(`${sourceId}`) || [];
        tCellList.splice(tCellList.findIndex((id: any) => `${id}` === `${target}`), 1, dummyNodeId);
        sourceTargetMap.set(`${sourceId}`, tCellList);

        targetSourceMap.set(dummyNodeId, [sourceId]);

        if (i === targetLevel - 1) {
          sourceTargetMap.set(dummyNodeId, [target]);

          const sCellList = targetSourceMap.get(`${target}`) ?? [];
          sCellList.splice(sCellList.findIndex((id: any) => `${id}` === `${source}`), 1, dummyNodeId);
          targetSourceMap.set(target, sCellList);
        }

        sourceId = dummyNodeId;
        nodeIdMap.set(dummyNodeId, { id: dummyNodeId });

        dummyMap.set(i, [...new Set([...(dummyMap.get(i) ?? []), dummyNodeId])]);
      }
    }
  });

  for (let i = 0; i < levelMap.size; i += 1) {
    const currentLength = [...(levelMap.get(i) ?? []), ...(dummyMap.get(i) ?? [])].length;
    if (i === 0 || (currentLength > maxLevelLength)) {
      maxLevelLength = currentLength;
      maxLevel = i;
    }
  }

  for (let i = 0; i <= Math.max(maxLevel, levelDeep - maxLevel); i += 1) {
    if (i) {
      const [prevIndex, nextIndex] = [maxLevel - i, maxLevel + i];
      if (prevIndex > -1) setLevelMap(levelMap, dummyMap, resultIndexMap, prevIndex, -i, maxLevelLength, nodeIdMap, levelMaxItemWidth, status, env, sourceTargetMap, targetSourceMap);
      if (nextIndex <= levelDeep) setLevelMap(levelMap, dummyMap, resultIndexMap, nextIndex, i, maxLevelLength, nodeIdMap, levelMaxItemWidth, status, env, sourceTargetMap, targetSourceMap);
    } else {
      setLevelMap(levelMap, dummyMap, resultIndexMap, maxLevel, i, maxLevelLength, nodeIdMap, levelMaxItemWidth, status, env);
    }
  }

  for (let i = 0; i < levelMap.size; i += 1) {
    const levelArray = levelMap.get(i) ?? [];
    let sumWidth = 0;
    levelArray.forEach((item: any) => {
      const index: number = item?.index;
      const currentItemWidth = levelMaxItemWidth[index] ?? 0;
      if (item !== '') {
        Object.assign(item, { x: (index * 100) + sumWidth + ((currentItemWidth - (item.letterWidth ?? 0)) / 2) });
      }
      sumWidth += currentItemWidth;
    });
  }

  return {
    edges: edges?.map?.((edge: any) => ({
      ...edge,
      source: `${edge?.source?.cell ?? edge?.source}`,
      target: `${edge?.target?.cell ?? edge?.target}`,
    })) ?? [],
    nodes: [...levelMap.values()].flat(Infinity).filter((item: any) => !!item.id && !`${item.id}`.includes('_')),
  };
};

export {
  graphFormat,
};
