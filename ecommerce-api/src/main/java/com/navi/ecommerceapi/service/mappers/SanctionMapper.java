package com.navi.ecommerceapi.service.mappers;

import com.navi.ecommerceapi.dto.SanctionResDto;
import com.navi.ecommerceapi.model.Sanction;
import org.springframework.stereotype.Component;

@Component
public class SanctionMapper {
    public SanctionResDto toSanctionDto(Sanction sanction) {
        return SanctionResDto.builder()
                .sanctionId(sanction.getSanctionId())
                .userId(sanction.getUser().getUserId())
                .username(sanction.getUser().getUsername())
                .moderatorId(sanction.getModerator().getUserId())
                .moderatorUsername(sanction.getModerator().getUsername())
                .reason(sanction.getReason())
                .startDate(sanction.getStartDate())
                .endDate(sanction.getEndDate())
                .status(sanction.getStatus())
                .build();
    }


}
